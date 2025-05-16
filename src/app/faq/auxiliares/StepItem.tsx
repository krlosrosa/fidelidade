interface StepItemProps {
  number: number;
  title: string;
  description: string;
  imageUrl?: string;
}

export function StepItem({ number, title, description, imageUrl }: StepItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {imageUrl && (
          <div className="mt-4 border rounded-lg overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
}