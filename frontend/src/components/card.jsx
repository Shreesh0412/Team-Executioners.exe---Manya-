function Card({title,value}){

    return(

        <div className="card">

            <h3
            style={{
                marginBottom:"15px"
            }}
            >
                {title}
            </h3>

            <h1
            style={{
                color:"#4F8EF7"
            }}
            >
                {value}
            </h1>

        </div>

    );

}

export default Card;