import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAuth } from "../context/useAuth"

export default function LayoutPpal() {
    const { cerrarSesion } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        cerrarSesion()
        navigate("/login", { replace: true })
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
                color: "text.primary"
            }}
        >
            <Header />
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1120,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: 1.5,
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    color="inherit"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>
            </Box>
            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: 1120,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 4, md: 6 },
                    flex: 1
                }}
            >
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}