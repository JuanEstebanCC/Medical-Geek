import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/styles.css";

const MyDiet = () => {

    const data = {
        typeDiet: "Vegetarian",
        description: "Their diet consists of only plant-based foods. It does not include animal protein or animal products such as eggs, milk, or honey.",
        imageURL: "https://img.freepik.com/foto-gratis/hermosa-mujer-joven-verduras-bolsa-compras-casa_1301-7672.jpg?size=626&ext=jpg&ga=GA1.2.509040202.1614980453",
        list: [
            "Vegetables	2 1/2 cups a day",
            "Fruits	2 cups a day.",
            "Grains (mostly whole)	6 1/2 ounces a day",
            "Dairy	3 cups a day",
            "Protein foods	3 1/2 ounces a day",
            "Oils	27 grams a day"
        ]   
    }

  return (
    <body>
        <div className="myDiet">
            <div className="header-myDiet">
                <h1>Hello My Diet</h1>
            <button className="button-myDiet" >Close</button>
            </div>
            <div className="diet">
                <h2>{data.typeDiet}</h2>
                <img src={data.imageURL}></img>
                <p>{data.description}</p>
                <ul>
                    {
                        data.list.map(item =>
                            <li>{item}</li>
                            )
                    }
                </ul>                     
            </div>
        </div>
    </body>
  );
};

export default withRouter(MyDiet);
