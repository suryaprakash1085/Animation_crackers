import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

export const ImagePicker = ({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) => {
  const onFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 1024 * 1024) {
      toast.error("Please pick an image under 1 MB (or paste an https URL).");
      return;
    }
    const r = new FileReader();
    r.onload = () => onChange(String(r.result || ""));
    r.readAsDataURL(f);
  };
  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="flex gap-2">
        <Input
          placeholder="Paste image URL or upload"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-900/60 border-white/10 text-slate-100"
        />
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
          <span className="inline-flex items-center gap-1 h-10 px-3 rounded-md border border-white/10 bg-slate-900/60 text-slate-200 hover:bg-slate-800 text-sm">
            <Upload className="w-4 h-4" /> Upload
          </span>
        </label>
        {value && (
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} className="text-slate-400">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {value && (
        <img src={value} alt="preview" className="max-h-32 rounded-lg border border-white/10 bg-black/20" />
      )}
    </div>
  );
};
