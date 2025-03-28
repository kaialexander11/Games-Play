import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as commentsService from '../api/comments.js';
import { createSubmitHandler } from '../util.js';

const formTemplate = (onSubmit) => html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onSubmit} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article> 
`;

export function commentFormView(ctx, isOwner) {

    if (ctx.user && !isOwner) {
        return formTemplate(createSubmitHandler(ctx, onSubmit));
    } else {
        return nothing;
    }

}

async function onSubmit(ctx, data, event) {
    //console.log(data);
    const gameId = ctx.params.id;
    
    await commentsService.postComment({
        gameId,
        comment: data.comment
    });

    //console.log(gameId, data);
    
    event.target.reset();
    ctx.page.redirect(`/details/${gameId}`);
}