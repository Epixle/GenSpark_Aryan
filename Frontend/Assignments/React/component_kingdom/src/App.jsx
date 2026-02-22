import { useState } from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Footer from "./Footer";
import './App.css'

function App() {
	return (
		<div className = "page">
			<Header />

			<div className = "layout">
				<MainContent />
				<Sidebar />
			</div>

			<Footer />
		</div>
	);
}

export default App