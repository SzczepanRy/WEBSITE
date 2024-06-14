import "./App.module.scss";
import "./_global.scss";
function App() {
    return (
        <>
            <h1>APP</h1>
        </>
    );
}

export function appLoader() {
    console.log("appLoader");
    return "appLoader";
}

export default App;
