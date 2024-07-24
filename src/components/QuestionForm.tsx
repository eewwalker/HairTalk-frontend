


export default function QuestionForm() {
    return(
        <div>
            <form>
                <label htmlFor="question">Question</label>
                <input type="text" id="question" name="question" />
                <button type="submit">Ask Question</button>
            </form>
        </div>
    )
}