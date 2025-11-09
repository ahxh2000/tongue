import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const API_KEY = "acc3502b6a0b4a55867ac7bacdd73425.InvyJ0Shcqq1i6uc"
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

const TONGUE_DIAGNOSIS_PROMPT = `你是一位经验丰富的中医师，专门从事舌诊分析。请仔细观察上传的舌象图片，并按照传统中医理论进行详细分析。

请从以下五个方面进行分析：
1. 苔质（厚薄、润燥、腐腻等）
2. 苔色（白、黄、灰、黑等）
3. 舌色（淡白、淡红、红、绛、紫等）
4. 舌形（胖大、瘦薄、齿痕、裂纹等）
5. 舌神（有神、少神、无神等）

请严格按照以下JSON格式返回分析结果，不要添加任何其他内容：

{
  "comment": "舌象整体提示：[整体分析和建议，包含饮食、作息、运动、情志调理建议]",
  "data": {
    "苔质": {
      "name": "[具体苔质类型]",
      "feature": "[详细特征描述]",
      "diagnosis": "[中医诊断意义]"
    },
    "苔色": {
      "name": "[具体苔色类型]",
      "feature": "[详细特征描述]",
      "diagnosis": "[中医诊断意义]"
    },
    "舌色": {
      "name": "[具体舌色类型]",
      "feature": "[详细特征描述]",
      "diagnosis": "[中医诊断意义]"
    },
    "舌形": {
      "name": "[具体舌形类型]",
      "feature": "[详细特征描述]",
      "diagnosis": "[中医诊断意义]"
    },
    "舌神": {
      "name": "[具体舌神状态]",
      "feature": "[详细特征描述]",
      "diagnosis": "[中医诊断意义]"
    }
  }
}`

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: '请上传图片' },
        { status: 400 }
      )
    }

    // 将图片转换为base64
    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const dataUrl = `data:${image.type};base64,${base64}`

    // 调用实际的AI API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "glm-4.5v",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: dataUrl,
                },
              },
              {
                type: "text",
                text: TONGUE_DIAGNOSIS_PROMPT,
              },
            ],
          },
        ],
        thinking: {
          type: "enabled",
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }

    const result = await response.json()
    const content = result.choices?.[0]?.message?.content

    if (!content) {
      throw new Error("API返回数据格式错误")
    }

    // 尝试解析JSON响应
    try {
      const analysisResult = JSON.parse(content)

      // 转换为前端期望的格式
      const formattedResult = {
        code: 200,
        msg: "success",
        time: new Date().toLocaleString('zh-CN'),
        data: {
          tongue: {
            tongue_color: analysisResult.data.舌色?.name || "未识别",
            tongue_shape: analysisResult.data.舌形?.name || "未识别",
            tongue_size: analysisResult.data.舌形?.feature || "未识别",
            tongue_moisture: analysisResult.data.苔质?.feature || "未识别",
            tongue_tongue_vein: "未识别",
            tongue_tongue_teeth_mark: analysisResult.data.舌形?.feature || "未识别",
            tongue_spots: "未识别",
            tongue_crack: analysisResult.data.舌形?.feature || "未识别",
            tongue_movement: analysisResult.data.舌神?.feature || "未识别"
          },
          coating: {
            coating_color: analysisResult.data.苔色?.name || "未识别",
            coating_thickness: analysisResult.data.苔质?.name || "未识别",
            coating_distribution: "分布均匀",
            coating_wetness: analysisResult.data.苔质?.feature || "未识别",
            coating_root: "根部正常"
          },
          analysis: {
            overall: analysisResult.comment || "舌象分析完成",
            details: [
              analysisResult.data.舌色?.diagnosis || "",
              analysisResult.data.苔色?.diagnosis || "",
              analysisResult.data.苔质?.diagnosis || "",
              analysisResult.data.舌形?.diagnosis || "",
              analysisResult.data.舌神?.diagnosis || ""
            ].filter(Boolean),
            suggestions: [analysisResult.comment]
          }
        }
      }

      return NextResponse.json(formattedResult)
    } catch (parseError) {
      // 如果直接解析失败，尝试提取JSON部分
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const analysisResult = JSON.parse(jsonMatch[0])

        // 转换为前端期望的格式
        const formattedResult = {
          code: 200,
          msg: "success",
          time: new Date().toLocaleString('zh-CN'),
          data: {
            tongue: {
              tongue_color: analysisResult.data.舌色?.name || "未识别",
              tongue_shape: analysisResult.data.舌形?.name || "未识别",
              tongue_size: analysisResult.data.舌形?.feature || "未识别",
              tongue_moisture: analysisResult.data.苔质?.feature || "未识别",
              tongue_tongue_vein: "未识别",
              tongue_tongue_teeth_mark: analysisResult.data.舌形?.feature || "未识别",
              tongue_spots: "未识别",
              tongue_crack: analysisResult.data.舌形?.feature || "未识别",
              tongue_movement: analysisResult.data.舌神?.feature || "未识别"
            },
            coating: {
              coating_color: analysisResult.data.苔色?.name || "未识别",
              coating_thickness: analysisResult.data.苔质?.name || "未识别",
              coating_distribution: "分布均匀",
              coating_wetness: analysisResult.data.苔质?.feature || "未识别",
              coating_root: "根部正常"
            },
            analysis: {
              overall: analysisResult.comment || "舌象分析完成",
              details: [
                analysisResult.data.舌色?.diagnosis || "",
                analysisResult.data.苔色?.diagnosis || "",
                analysisResult.data.苔质?.diagnosis || "",
                analysisResult.data.舌形?.diagnosis || "",
                analysisResult.data.舌神?.diagnosis || ""
              ].filter(Boolean),
              suggestions: [analysisResult.comment]
            }
          }
        }

        return NextResponse.json(formattedResult)
      }
      throw new Error("无法解析分析结果")
    }

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '分析失败，请稍后重试' },
      { status: 500 }
    )
  }
}