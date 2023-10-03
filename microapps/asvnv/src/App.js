import logo from './logo.svg';
import "@asvnv/core/styles/globals.scss"
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import { Container } from "@jds/core"
import { AboutPage, DonatePage, DonorsPage, EventsPage, ExecutiveCommitteePage, HomePage, SchemesPage } from './container';
import PageTemplateContextProvider from "@asvnv/core/providers/PageTemplateContextProvider";
import AppContextProvider from "@asvnv/core/providers/AppContextProvider"
import IntroContainer from 'container/intro';

function App() {
  return (
    <Container>      
      <BrowserRouter>
        <AppContextProvider>
          <PageTemplateContextProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/schemes/:uid' element={<SchemesPage />} />
              <Route path='/schemes' element={<SchemesPage />} />             
              <Route path='/events' element={<EventsPage />} />
              <Route path='/donors' element={<DonorsPage />} />
              <Route path='/donate' element={<DonatePage />} />
              <Route path='/committee' element={<ExecutiveCommitteePage />} />
            </Routes>
          </PageTemplateContextProvider>
        </AppContextProvider>
      </BrowserRouter>

    </Container>
  );
}

export default App;
