import AuthButton from '@/app/components/auth/AuthButton';
// import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="flex flex-row justify-start items-start w-full">
      <div
        style={{ width: "240px", minHeight: "100vh", position: "sticky", margin: "0px" }}
        className="hidden lg:flex flex-col p-6 bg-slate-950 border-r border-slate-800"
      >
        Sidebar
        <div className="flex w-full h-full bg-slate-800 rounded-lg">
          <AuthButton />
          Sidebar content
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full mx-0 md:mx-12 my-12">
        {children}
      </div>
    </div>
  )
}