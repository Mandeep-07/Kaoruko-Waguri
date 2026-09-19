import { useState } from 'react'

function Quicknote() {
  const [note, setNote] = useState('"Take your time. Stay gentle.')

  return (
    <section className="absolute left-[36%] top-[26%] w-[21%] max-w-[500px]">
      <div className="rounded-2xl border border-purple-300/20 bg-transparent p-4 backdrop-blur-md shadow-[0_0_25px_rgba(180,120,255,0.12)]">

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="h-8 w-full resize-none bg-transparent text-sm leading-5 text-purple-100 outline-none placeholder:text-purple-200/40"
          placeholder="Write something..."
        />

      </div>
    </section>
  )
}

export default Quicknote