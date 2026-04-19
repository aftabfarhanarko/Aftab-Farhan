export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        Feel free to reach out for collaborations or just to say hi!
      </p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent h-32"></textarea>
        </div>
        <button type="submit" className="px-6 py-2 bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 text-white rounded-lg">Send</button>
      </form>
    </div>
  );
}