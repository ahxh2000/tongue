'use client'

import { useEffect, useState } from 'react'

interface ResultDisplayProps {
  result: any
  onSave: () => void
  onReset: () => void
}

export default function ResultDisplay({ result, onSave, onReset }: ResultDisplayProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
  return (
    <div className="w-full max-w-md">
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

if (!result) {
    return (
      <div className="w-full max-w-md">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">分析结果</h3>
          <div className="text-center text-gray-500 py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2">请上传图片开始分析</p>
          </div>
        </div>
      </div>
    )
  }

  const { tongue, coating, analysis } = result.data

  return (
    <div className="w-full max-w-md">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">分析结果</h3>

        <div className="space-y-4">
          {/* 舌象分析 */}
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium text-green-700 mb-2">舌象分析</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">舌色：</span>{tongue.tongue_color}</p>
              <p><span className="font-medium">舌形：</span>{tongue.tongue_shape}</p>
              <p><span className="font-medium">舌体大小：</span>{tongue.tongue_size}</p>
              <p><span className="font-medium">湿润度：</span>{tongue.tongue_moisture}</p>
            </div>
          </div>

          {/* 舌苔分析 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-blue-700 mb-2">舌苔分析</h4>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">苔色：</span>{coating.coating_color}</p>
              <p><span className="font-medium">苔质：</span>{coating.coating_thickness}</p>
              <p><span className="font-medium">分布：</span>{coating.coating_distribution}</p>
              <p><span className="font-medium">润燥：</span>{coating.coating_wetness}</p>
            </div>
          </div>

          {/* 总体分析 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium text-purple-700 mb-2">总体分析</h4>
            <p className="text-sm mb-2">{analysis.overall}</p>

            <div className="space-y-2">
              <div>
                <h5 className="font-medium text-sm mb-1">详细分析：</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {analysis.details.map((detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-sm mb-1">健康建议：</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 pt-4 border-t">
            <button
              onClick={onSave}
              className="flex-1 btn-primary"
            >
              保存结果
            </button>
            <button
              onClick={onReset}
              className="flex-1 btn-secondary"
            >
              重新分析
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}