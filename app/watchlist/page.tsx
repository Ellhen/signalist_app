import WatchlistTable from '@/components/WatchlistTable'

export default function WatchlistPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Watchlist</h1>
      <WatchlistTable
        items={[]}
        userId={''}
      />
    </div>
  )
}
