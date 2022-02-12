import React from 'react';
import '../../styles/App.css';
import Titlebar from '../Titlebar/Titlebar';
import Tabs from '../Tabs/Tabs';
import Bottombar from '../Bottombar/Bottombar';
import { InitFluent, borderEffect, borderEffectClear } from '../../contexts/Fluent';
import CodeEditor from '../Editor/CodeEditor';
import LeftMenu from '../LeftMenu/LeftMenu';
var appName = "SeTex";

function App(props: any) {
  window.onload = () => {
    document.addEventListener("mousemove", borderEffect);
    document.addEventListener("mouseleave", borderEffectClear);
  }
  return (
    <React.Fragment>
      <header>
        <Titlebar>{appName}</Titlebar>
        <Tabs>
        </Tabs>
      </header>

      <main>
        <LeftMenu />
        <CodeEditor />
      </main>

      <footer>
        <Bottombar></Bottombar>
      </footer>
      <InitFluent />
    </React.Fragment>
  );
}

export default App;
