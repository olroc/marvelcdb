'use client'
import clsx from 'clsx'

type ClassItemProps = {
  aspect: Aspect
  checked: boolean
  onChange: (aspect: Aspect) => void
}

const mapAspectToProps: (aspect: Aspect) => {
  button: string
  text: string
  label: string
} = (aspect: Aspect) => {
  switch (aspect) {
    case 'pool':
      return {
        button:
          'peer-focus:ring-pink-300 dark:peer-focus:ring-pink-500 peer-checked:bg-pink-300',
        text: 'text-pink-400',
        label: "'Pool",
      }
    case 'protection':
      return {
        button:
          'peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:bg-green-600',
        text: 'text-green-400',
        label: 'Protection',
      }
    case 'agression':
      return {
        button:
          'peer-focus:ring-red-300 dark:peer-focus:ring-red-800 peer-checked:bg-red-600',
        text: 'text-red-400',
        label: 'Aggressivité',
      }
    case 'leadership':
      return {
        button:
          'peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600',
        text: 'text-blue-400',
        label: 'Commandement',
      }
    case 'justice':
      return {
        button:
          'peer-focus:ring-yellow-100 dark:peer-focus:ring-yellow-400 peer-checked:bg-yellow-300',
        text: 'text-yellow-300',
        label: 'Justice',
      }
    case 'basic':
      return {
        button:
          'peer-focus:ring-gray-200 dark:peer-focus:ring-gray-200 peer-checked:bg-gray-300',
        text: 'text-gray-400',
        label: 'Basique',
      }
    default:
      return { button: '', text: '', label: '' }
  }
}

export default function AspectItem({
  aspect,
  checked,
  onChange,
}: ClassItemProps) {
  const handleChange = () => onChange(aspect)
  const aspectProps = mapAspectToProps(aspect)

  return (
    <label className="relative inline-flex items-center me-5 cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={handleChange}
        checked={checked}
      />

      <div
        className={clsx(
          "w-11 h-6 rounded-full peer peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
          'bg-gray-200 dark:bg-gray-700 peer-checked:after:border-white dark:border-gray-600',
          aspectProps.button
        )}
      ></div>
      <span
        className={clsx(
          'ms-3 text-sm font-medium',
          checked ? aspectProps.text : 'text-white'
        )}
      >
        {aspectProps.label}
      </span>
    </label>
  )
}
