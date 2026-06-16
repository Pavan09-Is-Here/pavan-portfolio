export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050816]">
      <div className="absolute left-1/2 top-[-120px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute right-[-120px] top-[300px] h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="absolute bottom-[-160px] left-[-120px] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
    </div>
  );
}