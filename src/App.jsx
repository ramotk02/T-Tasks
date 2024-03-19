import { Calendar } from "./components/ui/calendar"
import SideBr from "./SideBar"

function App() {

  return (
    <section className="flex">
      <SideBr/>
      <div className="flex w-[100%] justify-end m-10 "><Calendar/></div>
    </section>
  )
}

export default App;
