import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const Collection = lazy(() => import("@/pages/Collection"));
const PieceDetail = lazy(() => import("@/pages/PieceDetail"));
const Styling = lazy(() => import("@/pages/Styling"));
const Lookbook = lazy(() => import("@/pages/Lookbook"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Misc").then((m) => ({ default: m.Privacy })));
const PhotoCredits = lazy(() => import("@/pages/Misc").then((m) => ({ default: m.PhotoCredits })));
const NotFound = lazy(() => import("@/pages/Misc").then((m) => ({ default: m.NotFound })));

function Loading() {
  return (
    <div className="grid min-h-[80vh] place-items-center bg-noir" role="status" aria-label="Loading">
      <span className="font-display text-2xl tracking-[0.3em] text-gold-soft/60 fade-in">NNUNJI</span>
    </div>
  );
}

const L = (el: ReactNode) => <Suspense fallback={<Loading />}>{el}</Suspense>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={L(<Collection />)} />
          <Route path="collection/:slug" element={L(<PieceDetail />)} />
          <Route path="styling" element={L(<Styling />)} />
          <Route path="lookbook" element={L(<Lookbook />)} />
          <Route path="about" element={L(<About />)} />
          <Route path="contact" element={L(<Contact />)} />
          <Route path="privacy" element={L(<Privacy />)} />
          <Route path="photo-credits" element={L(<PhotoCredits />)} />
          <Route path="*" element={L(<NotFound />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
