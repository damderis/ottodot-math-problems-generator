import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { supabase } from '../../../lib/supabaseClient'

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { action, sessionId, userAnswer, difficulty, problemType } = await request.json()

    if (action === 'generate') {
      return await generateProblem(difficulty, problemType)
    } else if (action === 'submit') {
      if (!sessionId || userAnswer === undefined) {
        return NextResponse.json(
          { error: 'Session ID and user answer are required' },
          { status: 400 }
        )
      }
      return await submitAnswer(sessionId, userAnswer)
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "generate" or "submit"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function generateProblem(difficulty: string = 'easy', problemType: string[] = ['addition', 'subtraction', 'multiplication', 'division']) {
  try {
    const model = 'gemini-2.5-flash-preview-09-2025'
    
    // Convert difficulty to grade-appropriate level
    const difficultyMap = {
      'easy': 'Primary 3-4 (Grade 3-4)',
      'medium': 'Primary 5 (Grade 5)',
      'hard': 'Primary 6 (Grade 6)'
    }
    
    const difficultyLevel: string = difficultyMap[difficulty as keyof typeof difficultyMap] || 'Primary 5 (Grade 5)'
    const operations = Array.isArray(problemType) ? problemType.join(', ') : problemType
    
    const prompt = `Generate a ${difficultyLevel} level math word problem using only these operations: ${operations}. The problem should be engaging, creative, and age-appropriate.

CRITICAL: You must respond with ONLY a valid JSON object in this exact format:
{
  "problem_text": "A clear, engaging word problem suitable for a 10-11 year old",
  "final_answer": 42 or 42.00
}

Requirements:
- The problem_text should be a complete math word problem with a unique scenario
- The final_answer must be a positive integer or decimal with two decimal places (number, decimal, not string)
- Create diverse and varied problem scenarios - avoid repetitive templates
- Vary the narrative style, characters, and settings in each problem
- Use a mix of different contexts: nature, technology, travel, cooking, space, history, etc.
- Include different question formats (how many total, how many more/less, how many left, etc.)
- Use basic arithmetic operations (addition, subtraction, multiplication, division)
- Use numbers reasonable for mental math or simple calculations
- Use clear, simple language with age-appropriate vocabulary
- Make problems fun and relatable to children's interests

Examples of diverse scenarios:
- Space exploration and astronomy
- Environmental conservation
- Cultural festivals and traditions
- Digital technology and games
- Sports tournaments and competitions
- Cooking and baking measurements
- Wildlife and nature
- Travel and geography
- Arts and crafts projects
- Community service activities

Respond with ONLY the JSON object, no other text.`

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ]

    const response = await ai.models.generateContentStream({
      model,
      contents,
    })

    let fullResponse = ''
    for await (const chunk of response) {
      fullResponse += chunk.text || ''
    }

    // Parse the JSON response
    let problemData
    try {
      console.log('Full AI response:', fullResponse)
      
      // Clean the response first
      const cleanedResponse = fullResponse.trim()
      
      // Try to parse directly first
      try {
        problemData = JSON.parse(cleanedResponse)
        console.log('Direct parse successful:', problemData)
      } catch {
        // If direct parse fails, try to extract JSON
        const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          console.log('Extracted JSON:', jsonMatch[0])
          problemData = JSON.parse(jsonMatch[0])
          console.log('Extracted parse successful:', problemData)
        } else {
          console.error('No JSON found in response. Full response:', fullResponse)
          throw new Error('No JSON found in response')
        }
      }
    } catch (parseError) {
      console.error('Failed to parse AI response. Parse error:', parseError)
      console.error('Full response:', fullResponse)
      
      // Fallback: Create a default problem if parsing fails
      console.log('Using fallback problem due to parsing error')
      problemData = {
        problem_text: "Sarah has 12 stickers. She gives 5 stickers to her friend. How many stickers does Sarah have left?",
        final_answer: 7
      }
    }

    // Validate the response structure
    console.log('Validating response structure:')
    console.log('- problem_text:', problemData.problem_text, typeof problemData.problem_text)
    console.log('- final_answer:', problemData.final_answer, typeof problemData.final_answer)
    
    // Ensure final_answer is a number
    if (typeof problemData.final_answer === 'string') {
      problemData.final_answer = parseInt(problemData.final_answer, 10)
    }
    
    if (!problemData.problem_text || typeof problemData.final_answer !== 'number' || isNaN(problemData.final_answer)) {
      console.error('Invalid AI response structure. Problem data:', problemData)
      // Use fallback if validation fails
      problemData = {
        problem_text: "Tom has 8 apples. He eats 3 apples. How many apples does Tom have left?",
        final_answer: 5
      }
      console.log('Using fallback problem due to validation error')
    }

    // Save the problem to the database
    const { data, error } = await supabase
      .from('math_problem_sessions')
      .insert({
        problem_text: problemData.problem_text,
        correct_answer: problemData.final_answer
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error('Failed to save problem to database')
    }

    return NextResponse.json({
      success: true,
      problem: {
        problem_text: problemData.problem_text,
        final_answer: problemData.final_answer
      },
      sessionId: data.id
    })
  } catch (error) {
    console.error('Error generating problem:', error)
    return NextResponse.json(
      { error: 'Failed to generate problem' },
      { status: 500 }
    )
  }
}

async function submitAnswer(sessionId: string, userAnswer: number) {
  try {
    // Get the original problem
    const { data: sessionData, error: sessionError } = await supabase
      .from('math_problem_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (sessionError || !sessionData) {
      return NextResponse.json(
        { error: 'Problem session not found' },
        { status: 404 }
      )
    }

    const isCorrect = userAnswer === sessionData.correct_answer

    // Generate feedback
    // If correct: return a fast, templated congrats message (no AI call)
    // If incorrect: call AI to produce a brief, step-by-step explanation
    let feedbackText = ''
    if (isCorrect) {
      feedbackText = 'Fantastic work! You got it right 🎉 Keep it up and try the next challenge!'
    } else {
      const model = 'gemini-2.5-flash-lite'
      const feedbackPrompt = `You are a supportive Primary 5 math teacher. Generate a short step-by-step explanation to help the student understand this problem:

Problem: "${sessionData.problem_text}"
Correct Answer: ${sessionData.correct_answer}
Student's Answer: ${userAnswer}

Requirements:
- Simple, clear language for a 10-11 year old
- 3-4 sentences maximum
- Encouraging tone with a couple of emojis

Just provide the feedback text, no additional formatting.`

      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: feedbackPrompt,
            },
          ],
        },
      ]
      const config = { maxOutputTokens: 200, temperature: 0.4 }

      const response = await ai.models.generateContentStream({
        model,
        contents,
        config,
      })

      for await (const chunk of response) {
        feedbackText += chunk.text || ''
      }
      feedbackText = feedbackText.trim()
    }

    // Save the submission to the database
    const { error: submissionError } = await supabase
      .from('math_problem_submissions')
      .insert({
        session_id: sessionId,
        user_answer: userAnswer,
        is_correct: isCorrect,
        feedback_text: feedbackText
      })

    if (submissionError) {
      console.error('Database error saving submission:', submissionError)
      // Don't fail the request if we can't save the submission
    }

    return NextResponse.json({
      success: true,
      isCorrect,
      feedback: feedbackText,
      correctAnswer: sessionData.correct_answer
    })
  } catch (error) {
    console.error('Error submitting answer:', error)
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    )
  }
}
  