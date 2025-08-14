type mapType = {
  mapUrl: string;
};
export default function LocationMap({ mapUrl }: mapType) {
  return (
    <div className="w-full h-auto relative">
      <iframe
        src={mapUrl}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0 rounded-md min-h-[300px]"
      ></iframe>
    </div>
  );
}
