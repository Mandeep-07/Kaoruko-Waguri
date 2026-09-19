import { useState } from 'react'

function Youtubeplayer() {
  const [url, setUrl] = useState('')
  const [playerUrl, setPlayerUrl] = useState('')

  const getYoutubePlayerUrl = (link) => {
    try {
      const parsedUrl = new URL(link)

      const hostname = parsedUrl.hostname.replace('www.', '')

      // =========================
      // YOUTUBE PLAYLIST
      // =========================

      const playlistId = parsedUrl.searchParams.get('list')

      if (playlistId) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`
      }

      // =========================
      // NORMAL YOUTUBE VIDEO
      // =========================

      if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        const videoId = parsedUrl.searchParams.get('v')

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1`
        }
      }

      // =========================
      // YOUTU.BE
      // =========================

      if (hostname === 'youtu.be') {
        const videoId = parsedUrl.pathname.slice(1).split('/')[0]

        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1`
        }
      }

      // =========================
      // YOUTUBE SHORTS
      // =========================

      if (hostname === 'youtube.com') {
        const parts = parsedUrl.pathname.split('/')

        if (parts[1] === 'shorts' && parts[2]) {
          return `https://www.youtube.com/embed/${parts[2]}?autoplay=1`
        }
      }

      return null
    } catch {
      return null
    }
  }

  const handlePlay = () => {
    const embedUrl = getYoutubePlayerUrl(url)

    if (embedUrl) {
      setPlayerUrl(embedUrl)
    } else {
      alert('Please enter a valid YouTube video or playlist link.')
    }
  }

  return (
    <section className="absolute left-[36%] top-[42%] w-[21%] max-w-82.5">

      <div
        className="
          rounded-2xl
          border border-purple-300/20
          bg-transparent
          p-4
          backdrop-blur-md
          shadow-[0_0_30px_rgba(180,120,255,0.15)]
        "
      >

        {/* =========================
            YOUTUBE SCREEN
        ========================= */}

        <div className="aspect-video overflow-hidden rounded-xl bg-black/60">

          {playerUrl ? (
            <iframe
              className="h-full w-full"
              src={playerUrl}
              title="YouTube Player"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-purple-200/50">
              YouTube Player
            </div>
          )}

        </div>

        {/* =========================
            TITLE
        ========================= */}

        <h3 className="mt-3 text-center text-sm font-medium text-purple-100">
          Music
        </h3>

        {/* =========================
            URL INPUT
        ========================= */}

        <div className="mt-3 flex gap-2">

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handlePlay()
              }
            }}
            placeholder="Paste a YouTube link..."
            className="
              min-w-0
              flex-1
              rounded-lg
              border border-purple-300/20
              bg-black/20
              px-3
              py-2
              text-xs
              text-purple-100
              outline-none
              placeholder:text-purple-200/40
              focus:border-purple-300/50
            "
          />

          <button
            onClick={handlePlay}
            className="
              rounded-lg
              bg-purple-300
              px-3
              text-sm
              text-purple-950
              transition
              hover:bg-purple-200
              hover:scale-105
            "
            aria-label="Play YouTube"
          >
            ▶
          </button>

        </div>

      </div>

    </section>
  )
}

export default Youtubeplayer