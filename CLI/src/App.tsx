import { useState, useEffect } from 'react'
import MetallicPaint, { parseLogoImage } from './components/Animations/MetallicPaint/MetallicPaint'
import './App.css'

function App() {
  const [imageData, setImageData] = useState<ImageData | null>(null)

  // Your exact parameters from the image
  const params = {
    edge: 0,
    patternScale: 2.2,
    patternBlur: 0.014,
    refraction: 0.02,
    liquid: 0.11,
    speed: 0.3,
  }

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Fetch the SVG file
        const response = await fetch('/group27.svg')
        const svgText = await response.text()
        
        // Create a blob from the SVG text
        const blob = new Blob([svgText], { type: 'image/svg+xml' })
        const file = new File([blob], 'group27.svg', { type: 'image/svg+xml' })
        
        // Parse the image
        const { imageData } = await parseLogoImage(file)
        setImageData(imageData)
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }

    loadImage()
  }, [])

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      {imageData ? (
        <div className="w-full h-full">
          <MetallicPaint 
            imageData={imageData}
            params={params}
          />
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </div>
  )
}

export default App
