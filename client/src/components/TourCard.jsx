export default function TourCard({tour}) {
    // let tour = {
    //     tourName: '',
    //     cityName: '',
    //     startDate: '',
    //     endDate: '',
    //     duration: '',
    //     price: '',
    //     description: '',
    // };
    return (
        <div className="tourCard">
            <img src="" alt="" />
            <h3>{tour.tourName}</h3>
            <div>{tour.cityName}</div>
            <div>{tour.startDate} - {tour.endDate}</div>
            <div>{tour.duration}</div>
            <div>{tour.price}</div>
            <button>Узнать подробнее</button>
        </div>
    )
}
