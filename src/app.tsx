// import { useState } from 'preact/hooks'
// import preactLogo from './assets/preact.svg'
// import viteLogo from '/vite.svg'
import './app.css'

export function App() {

  return (
    <div className="min-h-screen bg-surface-page p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-heading text-heading">
          Biglight Component Library
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-heading">Theme Test</h2>
          
          {/* Test Brand A (default) */}
          <div className="p-6 bg-white rounded-lg space-y-4">
            <h3 className="text-xl font-semibold">Brand A (Default)</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg" style={{backgroundColor: 'var(--color-primary-default)'}}></div>
              <div className="w-20 h-20 rounded-lg" style={{backgroundColor: 'var(--color-surface-action-primary)'}}></div>
              <div className="w-20 h-20 rounded-lg bg-surface-action-secondary"></div>
            </div>
            <p className="text-body">
              Primary color should be orange (#fc4c02)
            </p>
          </div>
          
          {/* Test Brand B */}
          <div className="p-6 bg-white rounded-lg space-y-4" data-theme="brandB">
            <h3 className="text-xl font-semibold">Brand B</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg" style={{backgroundColor: 'var(--color-primary-default)'}}></div>
              <div className="w-20 h-20 rounded-lg" style={{backgroundColor: 'var(--color-surface-action-primary)'}}></div>
            </div>
            <p className="text-body">
              Primary color should be cherry/burgundy (#901438)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
