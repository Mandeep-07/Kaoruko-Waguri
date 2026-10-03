import { useState } from 'react'

function Quicknote() {
  const [note, setNote] = useState('"Take your time. Stay gentle.')

  return (
    <section className="absolute left-[36%] top-[26%] w-[21%] max-w-[500px]">
      <div
        className="
          rounded-2xl
          border
          border-[var(--theme-border)]
          bg-[var(--theme-card)]
          p-4
          backdrop-blur-md
          shadow-[0_0_25px_var(--theme-shadow-color)]
        "
      >
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="
            h-8
            w-full
            resize-none
            bg-transparent
            text-sm
            leading-5
            text-[var(--theme-text)]
            outline-none
            placeholder:text-[var(--theme-text-muted)]
          "
          placeholder="Write something..."
        />
      </div>
    </section>
  )
}

export default Quicknote