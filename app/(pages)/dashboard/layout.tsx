import { Box } from '@mui/material';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box className="flex flex-row justify-start items-start w-full">
      <Box
        sx={{ width: "240px", minHeight: "100vh", position: "sticky", margin: "0px" }}
        className="flex flex-col p-6 bg-slate-950 border-r border-slate-800"
      >
        <Box className="flex w-full h-full bg-slate-800 rounded-lg"></Box>
      </Box>
      <Box className="flex flex-col justify-center items-start w-full mx-12 md:mx-18 lg:mx-24 my-12">
        {children}
      </Box>
    </Box>
  )
}