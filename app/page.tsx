'use client'

import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import ResultDisplay from './components/ResultDisplay'
import Instructions from './components/Instructions'

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.code === 200) {
        setAnalysisResult(result)
      } else {
        alert('分析失败：' + (result.error || '未知错误'))
      }
    } catch (error) {
      console.error('Analysis error:', error)
      alert('分析失败，请稍后重试')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSave = () => {
    if (!analysisResult) return

    // 创建下载内容
    const content = `
中医舌诊分析报告
================
分析时间: ${analysisResult.time}

舌象分析:
- 舌色: ${analysisResult.data.tongue.tongue_color}
- 舌形: ${analysisResult.data.tongue.tongue_shape}
- 舌体大小: ${analysisResult.data.tongue.tongue_size}
- 湿润度: ${analysisResult.data.tongue.tongue_moisture}

舌苔分析:
- 苔色: ${analysisResult.data.coating.coating_color}
- 苔质: ${analysisResult.data.coating.coating_thickness}
- 分布: ${analysisResult.data.coating.coating_distribution}
- 润燥: ${analysisResult.data.coating.coating_wetness}

总体分析:
${analysisResult.data.analysis.overall}

详细分析:
${analysisResult.data.analysis.details.map((d: string) => `- ${d}`).join('\n')}

健康建议:
${analysisResult.data.analysis.suggestions.map((s: string) => `- ${s}`).join('\n')}
    `.trim()

    // 创建下载链接
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `舌诊分析报告_${new Date().toLocaleDateString()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    alert('报告已保存')
  }

  const handleReset = () => {
    setSelectedImage(null)
    setAnalysisResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* 顶部标题 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
              中医舌诊智能分析系统
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              基于AI技术的中医舌诊健康分析工具
            </p>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* 工作区 */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">工作区</h2>
            <p className="text-gray-600">上传舌头照片，获取智能分析结果</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            <ImageUpload
              onImageChange={setSelectedImage}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

            <ResultDisplay
              result={analysisResult}
              onSave={handleSave}
              onReset={handleReset}
            />
          </div>
        </section>

        {/* 使用说明区 */}
        <section>
          <Instructions />
        </section>
      </main>

      {/* 底部 */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 中医舌诊智能分析系统 | 仅供参考，不能替代专业医疗诊断</p>
          </div>
        </div>
      </footer>
    </div>
  )
}