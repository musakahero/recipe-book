import "./Create.css";

export const Create = (props) => {

    return (
        <div className="create-container">
            <h1 className="create-title">Post a recipe</h1>

            <form className="create-form" method="post" onSubmit={null}>

                <label htmlFor="create-name">Recipe name</label>
                <input className="create-name" onChange={null} name="create-name" type="text" />

                <label htmlFor="create-ingredients">Ingredients</label>
                <input className="create-ingredients" name="create-ingredients" type="text"/> 

                <label htmlFor="create-prep-time">Preparation time</label>
                <input className="create-prep-time" name="create-prep-time" type="text"/>       

                <label htmlFor="create-steps" className="steps-label">Steps to prepare: </label>
                <textarea className="create-steps" rows={10} cols={40} name="create-steps" type="text"/> 

                <button type="submit" className="btn create-submit">Add Recipe</button>
            </form>
        </div>
    )
};