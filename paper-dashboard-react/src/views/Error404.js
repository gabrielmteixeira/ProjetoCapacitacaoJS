
import React from "react";
class Error404 extends React.Component {
  render() {
    return (
      <>
        <div className="content" style={{textAlign:"center"}}>
            <h3>Erro404: Página não encontrada</h3>
            <div style={{borderRadius:"15px", opacity:"0.7"}}>
              <img src="https://dinahosting.com/blog/cont/uploads/2020/07/eror-404.jpg"/>
            </div>
        </div>
      </>
    );
  }
}

export default Error404;
