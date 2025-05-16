interface VideoDemoProps {
  title: string;
  description: string;
  videoUrl: string;
}

export function VideoDemo({ title, description, videoUrl }: VideoDemoProps) {
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="aspect-video bg-muted">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}