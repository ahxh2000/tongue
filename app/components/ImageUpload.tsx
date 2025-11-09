'use client'

import { useState } from 'react'

interface ImageUploadProps {
  onImageChange: (file: File | null) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function ImageUpload({ onImageChange, onAnalyze, isAnalyzing }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleCameraInput = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    }
    input.click()
  }

  return (
    <div className="w-full max-w-md">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">图片上传</h3>

        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            dragActive
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="舌头图片预览"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setPreviewUrl(null)
                    onImageChange(null)
                  }}
                  className="btn-secondary text-sm"
                >
                  重新选择
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="mt-2 text-sm">拖拽图片到这里或点击选择</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <label className="flex-1 btn-primary text-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            选择图片
          </label>

          <button
            onClick={handleCameraInput}
            className="flex-1 btn-primary"
          >
            拍照上传
          </button>
        </div>

        {previewUrl && (
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="w-full mt-4 btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? '分析中...' : '开始分析'}
          </button>
        )}
      </div>
    </div>
  )
}