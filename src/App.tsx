import Footer from './Footer'
import BulkActionDemo from './features/bulk-action/BulkActionDemo'
import ReactQueryTest from './features/react-query/ReactQueryTest'
function App() {
  return (
    <>
      <div>
        <h1>Chase Test</h1>
      </div>
      <hr />
      {/* <BulkActionDemo /> */}
      <ReactQueryTest isEnable={true} />
      {/* Render Footer component */}
      <Footer />
    </>
  )
}

export default App
