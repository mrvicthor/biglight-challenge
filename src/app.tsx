
import './app.css'
import { Button } from './stories/button'

export function App() {

  return (
    <div className="min-h-screen bg-surface-page p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-heading text-heading">
          Biglight Component Library
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-heading">Theme Test</h2>

          <div className="p-6 bg-white rounded-lg space-y-4">
            <h3 className="text-xl font-semibold">Brand A (Default)</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-surface-colour-action-primary"></div>
              <div className="w-20 h-20 rounded-lg bg-surface-colour-action-secondary"></div>
              <div className="w-20 h-20 rounded-lg bg-surface-colour-accent"></div>
            </div>
            <p className="text-body-lg-desktop text-text-colour-brand">
              Primary color should be orange (#fc4c02)
            </p>
            <div className='flex gap-2'>
              <Button variant='primary' size='small'>Test button 2</Button>

              <Button variant='secondary' size='medium'>Test button</Button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg space-y-4">
            <h3 className="text-xl font-semibold">Brand B</h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-primitives-colour-brand-brandb-accent-burgundy"></div>
              <div className="w-20 h-20 rounded-lg bg-primitives-colour-brand-brandb-accent-spritz" ></div>
            </div>
            <p className="text-primitives-colour-brand-brandb-accent-spritz">
              Primary color should be cherry/burgundy (#901438)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
