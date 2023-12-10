import "./RecipeItem.css";
export const RecipeItem = (props) => {

    return (
            <div className="recipe-item">
                <div className="item-element img-container">
                </div>
                <p className="item-element item-title">Title</p>
                <p className="item-element item-createdBy">Added by: Admin</p>
                <p className="item-element item-prep-time">Preparation time: 30 minutes</p>
            </div>
    )
}