export default function Instructions() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">使用说明</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 使用步骤 */}
          <div>
            <h4 className="font-medium text-green-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              使用步骤
            </h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                点击"选择图片"或"拍照上传"按钮，上传舌头照片
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                确保照片清晰，光线充足，舌头完全展示
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                点击"开始分析"按钮，等待系统分析结果
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                查看分析结果，可以保存或重新分析
              </li>
            </ol>
          </div>

          {/* 注意事项 */}
          <div>
            <h4 className="font-medium text-orange-700 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              注意事项
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                请在自然光线下拍摄，避免强光或阴影
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                拍摄前请清洁口腔，不要进食染色食物
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                舌头自然伸出，不要过分用力
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                本分析仅供参考，具体诊断请咨询专业中医师
              </li>
            </ul>
          </div>
        </div>

        {/* 免责声明 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            <strong>免责声明：</strong>本系统仅提供中医舌诊参考分析，不能替代专业医疗诊断。如有健康问题，请及时就医咨询专业医师。
          </p>
        </div>
      </div>
    </div>
  )
}