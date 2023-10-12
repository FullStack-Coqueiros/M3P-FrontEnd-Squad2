import { BrowserRouter, Route, Routes } from "react-router-dom"



function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    {/* <Route index element={ <Home /> }></Route>
                    <Route path="/sobre" element={ <Sobre /> }></Route>
                    <Route path="/projetos" element={ <Projetos /> }></Route>
                    <Route path="/contatos" element={ <Contatos /> }></Route>
                    <Route path="*" element={ <Page404 /> }></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes