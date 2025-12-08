export default function TopPanel({ isMobile }) {
    return <>
        <div className="center-wrapper vertical-items" id="page-title">
            <span className="title-span">
                {isMobile ? "Лаба №4" : "Лабораторная работа №4"}
            </span>
            <span className="subtitle-span">
                {isMobile ? "по вебу" : "по веб-программированию"}
            </span>
        </div>
    </>
}