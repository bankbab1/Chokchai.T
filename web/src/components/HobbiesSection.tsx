export function HobbiesSection() {
    return <section id="hobbies" className="section reveal">
        <div className="section-head">
            <span className="section-num">/ 07</span>
            <h2 className="section-title">Outside Work</h2>
            <div className="section-rule" />
        </div>
        <div className="grid">
            <div className="card"><div className="card-icon"><i className="fa-solid fa-bicycle" aria-hidden="true" /></div><h3>Cycling</h3><p>Enjoying time on the bike, exploring routes and learning about bike setups.</p></div>
            <div className="card"><div className="card-icon"><i className="fa-solid fa-circle" aria-hidden="true" /></div><h3>Snooker</h3><p>A way to unwind while practising focus, patience and precision.</p></div>
            <div className="card"><div className="card-icon"><i className="fa-solid fa-lightbulb" aria-hidden="true" /></div><h3>Exploring New Ideas</h3><p>Exploring new tools and technologies, trying ideas and finding practical solutions to everyday problems.</p></div>
        </div>
    </section>;
}
