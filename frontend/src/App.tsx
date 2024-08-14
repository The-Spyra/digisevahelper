import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doc from "./pages/Doc"
import Charges from "./pages/Charges"
import Forms from "./pages/Forms"
import EditingTools from "./pages/EditingTools"
import Posts from "./pages/Posts"

const App = () => {
	return (
		<div className="pb-3 bg-[#DDE2E1]">

		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/doc" element={<Doc />} />
			<Route path="/charges" element={<Charges />} />
			<Route path="/forms" element={<Forms />} />
			<Route path="/editing-tools" element={<EditingTools />} />
			<Route path="/posts" element={<Posts />} />
		</Routes>
		</div>
	)
}

export default App
