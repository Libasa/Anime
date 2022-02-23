import React from 'react';
import services from '../../services';
import './home.css';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import settings from '../../settings';
import Card from '../../components/card/card';
class HomePage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			isShikimoriLoaded: false,
			items: {},
			shikimori: {},

		};
	}
	componentDidMount() {
		fetch(`${settings.api}/home`)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
						isLoaded: true,
						items: result.data,
					});
			},
			(error) => {
				this.setState({
					isLoaded: false,
					error
				});
			}
		);
		fetch('https://shikimori.one/api/topics?forum=news&limit=30')
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isShikimoriLoaded: true,
					shikimori: result,
				});
			},
			(error) => {
				this.setState({
					isShikimoriLoaded: false,
					error
				});
			}
		);

				// Promise.all(Object.keys(result).map(key =>
				// 	fetch(`${settings.api}/${key}/`,{
				// 		method: 'post',
				// 		headers: {
				// 			'Accept': 'application/json, text/plain, */*',
				// 			'Content-Type': 'application/json'
				// 		},
				// 		body: JSON.stringify( {page: 1} ),
				// 	}).then(resp => {return resp.json()})
				// 	.then(json => {
				// 		return {
				// 			id: key,
				// 			title: result[key].title,
				// 			data: json.data
				// 		}})
				// ))
				// .then(responses => {
				// 	this.setState({
				// 		isLoaded: true,
				// 		items: responses,
				// 	});
				// })
				// .catch(error => {
				// 		this.setState({
				// 			isLoaded: false,
				// 			error
				// 		});
				// 	});				Promise.all(Object.keys(result).map(key =>
				// 	fetch(`${settings.api}/${key}/`,{
				// 		method: 'post',
				// 		headers: {
				// 			'Accept': 'application/json, text/plain, */*',
				// 			'Content-Type': 'application/json'
				// 		},
				// 		body: JSON.stringify( {page: 1} ),
				// 	}).then(resp => {return resp.json()})
				// 	.then(json => {
				// 		return {
				// 			id: key,
				// 			title: result[key].title,
				// 			data: json.data
				// 		}})
				// ))
				// .then(responses => {
				// 	this.setState({
				// 		isLoaded: true,
				// 		items: responses,
				// 	});
				// })
				// .catch(error => {
				// 		this.setState({
				// 			isLoaded: false,
				// 			error
				// 		});
				// 	});				Promise.all(Object.keys(result).map(key =>
				// 		fetch(`${settings.api}/${key}/`,{
				// 			method: 'post',
				// 			headers: {
				// 				'Accept': 'application/json, text/plain, */*',
				// 				'Content-Type': 'application/json'
				// 			},
				// 			body: JSON.stringify( {page: 1} ),
				// 		}).then(resp => {return resp.json()})
				// 		.then(json => {
				// 			return {
				// 				id: key,
				// 				title: result[key].title,
				// 				data: json.data
				// 			}})
				// 	))
				// 	.then(responses => {
				// 		this.setState({
				// 			isLoaded: true,
				// 			items: responses,
				// 		});
				// 	})
				// 	.catch(error => {
				// 			this.setState({
				// 				isLoaded: false,
				// 				error
				// 			});
				// 		});
				

		// 	},
		// 	// Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
		// 	// чтобы не перехватывать исключения из ошибок в самих компонентах.
		// 	(error) => {
		// 		this.setState({
		// 			isLoaded: true,
		// 			error
		// 		});
		// 	}
		// )
	}
	render() {
		const { error, isLoaded, items, shikimori, isShikimoriLoaded} = this.state;
		console.log(items);
		console.log(shikimori);
		if (error) {
			return <div>Ошибка: {error.message}</div>;
		} else if (!isLoaded || !isShikimoriLoaded) {
			return <Loading/>;
		} else {
			return (
				<div className='wrapper'>
					<div className='services'>
						{items.map((el,key)=>{
							return <Link className='service' key={key} to={"/"+el.id}>
								<img src={settings.api+el.icon}/>
								<div className='title'>{el.title}</div>
							</Link>
						})}
					</div>
					{items.map((service,key) =>{
						return <div className='cards-container hide-cards' key={key}>
							<div className='service-title'>{service.title}</div>
							{service.data.map((item, i) => (
								<Card key={i} data={item} service={service}></Card>
							))}
						</div>
					})}
					<div className='shikimori-cards-container'>
						{/* <div className='block-title'>Shikimori news</div> */}
						{shikimori.map((el, index)=>{
							// console.log(el);
							return <a className="card-horizontal" href={`https://shikimori.one${el.forum.url}/${el.id}`} title={el.topic_title} key={index} target="_blank" rel="noopener noreferrer">
										<div className="poster">
											{/* <div className="blocks">
												{data.announce &&
													<div className="block" data-text="Анонс"></div>
												}
											</div> */}
											{function(){
												if (el.html_footer){
													var parser = new DOMParser();
													var footer = parser.parseFromString(el.html_footer, 'text/html');
													var images = [...footer.querySelectorAll('img')];
													console.log();
													if (images.length > 0){
														return <img src={images[0].attributes.src.nodeValue}/>;
													}
												}
											}()}
										</div>
										<div className="title">{el.topic_title}</div>
									</a>
							    {/* <div className='title'>{el.topic_title}</div> */}
								// {function(){
								// 	if (el.html_footer){
								// 		var parser = new DOMParser();
								// 		var footer = parser.parseFromString(el.html_footer, 'text/html');
								// 		var images = [...footer.querySelectorAll('img')];
								// 		if (images.length > 0){
								// 			return <img src={images[0].attributes.src.nodeValue} />;
								// 		}
								// 	}
								// }()}
							// </a>
						})}
					</div>
				</div> 
			);
		}
	}
}
export default HomePage;
