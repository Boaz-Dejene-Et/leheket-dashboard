import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Grid,
    MenuItem,
    InputLabel,
    TextField,
    FormControl,
    Select,
} from '@mui/material';
import MainCard from 'components/MainCard';
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom';

const DashboardDefault = (props) => {
    const params = useParams();
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [bookCategory, setBookCategory] = useState("")
    const [edition, setEdition] = useState("")
    const [image, setImage] = useState("")
    const [bookData, setBookData] = useState("")
    const categories = [
        "Business", "Politics", "Romantic", "Kids", "Research", "Adventure", "Inspirational", "Law", "History"
    ]
    const [authors, setAuthors] = useState([])

    const EditBook = () => {
        let query = `mutation MyQuery($id: uuid!, $title: String!, $subTitle: String!, $price: Int!, $description: String!, $authorId: String!, $category: String!, $edition: String!, $image: String!, $bookData: String!) {
            update_books_by_pk(pk_columns: {id: $id}, _set: {title: $title, subTitle: $subTitle, price: $price, description: $description, authorId: $authorId, category: $category, edition: $edition, image: $image, bookData: $bookData}) {
                title
                subTitle
                price
                description
                authorId
                category
                edition
                image
                bookData
            }
        }`

        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
            variables: {id: params?.id, title: title, subTitle: subTitle, price: price, description: description, authorId: authorId, category: bookCategory, edition: edition, image: image, bookData: bookData}
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data?.data?.update_books_by_pk) {
                toast.success("Book Edited")
            } else {
                toast.warning("Something went wrong")
            }
        }).catch((err) => {
            console.log(err)
            console.log(err?.response?.data)
            toast.warning("Something went wrong")
        })
    }

    const GetData = () => {
        const query = `query MyQuery($id: uuid!) {
            user {
                id
                name
            }
            books(where: {id: {_eq: $id}}) {
                authorId
                availability
                bookData
                category
                created_at
                description
                discount
                image
                id
                edition
                price
                publisher
                sold
                subTitle
                title
                totalAmountLeft
                updated_at
            }
        }`

        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
            variables: {id: params?.id}
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data?.data?.user) {
                setAuthors(res.data?.data?.user)
            }
            if(res.data?.data?.books.length > 0) {
                setTitle(res.data?.data?.books[0].title)
                setSubTitle(res.data?.data?.books[0].subTitle)
                setPrice(res.data?.data?.books[0].price)
                setDescription(res.data?.data?.books[0].description)
                setAuthorId(res.data?.data?.books[0].authorId)
                setBookCategory(res.data?.data?.books[0].category)
                setEdition(res.data?.data?.books[0].edition)
                setImage(res.data?.data?.books[0].image)
                setBookData(res.data?.data?.books[0].bookData)
            }
        }).catch((err) => {
            console.log(err)
            console.log(err.response?.data)
        })
    }

    useEffect(()=>{
        GetData()
    },[])

    useEffect(()=>{
        console.log(bookCategory)
    },[bookCategory])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={12} lg={12}>
                <FormControl onSubmit={EditBook} sx={{ width: "100%" }} item xs={12} md={12} lg={12}>
                    <MainCard sx={{ mt: 2, pb: 2, pl: 2, pr: 2, pt: 3 }} content={false}>
                        <Grid style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                        }}>
                            <TextField 
                                label="Title" 
                                color="secondary" 
                                focused 
                                sx={{width: 300}} 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                            <TextField 
                                label="SubTitle (optional)" 
                                color="secondary" 
                                focused 
                                sx={{width: 300}}
                                value={subTitle}
                                onChange={(e)=>setSubTitle(e.target.value)}
                            />
                            <TextField 
                                label="Price" 
                                color="secondary" 
                                type="number" 
                                focused 
                                sx={{width: 300}}
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </Grid>
                        <TextField 
                            multiline 
                            minRows={7} 
                            sm={7} md={5} lg={4} 
                            label="Description" 
                            color="secondary" 
                            focused 
                            fullWidth 
                            style={{marginTop: "30px"}}
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                        <Grid style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "30px"
                        }}>
                            {/* <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} 
                                    label="Author Id"
                                    focused 
                                    color="secondary"
                                    // value={authorId}
                                    onChange={(e)=>{
                                        // setAuthorId(e.target.value)
                                        console.log(e.target.value)
                                    }} />
                                }
                            /> */}
                            <FormControl
                                sx={{ width: 300 }}
                            >
                                <InputLabel id="demo-simple-select-label">Author Id</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    focused
                                    value={authorId}
                                    sx={{ width: 300 }}
                                    label="Author Id"
                                    onChange={(e)=>setAuthorId(e.target.value)}
                                >
                                    {authors.map(author => (
                                        <MenuItem value={author.id}>{author.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                sx={{ width: 300 }}
                            >
                                <InputLabel id="demo-simple-select-label">Book Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    focused
                                    value={bookCategory}
                                    sx={{ width: 300 }}
                                    label="Book Category"
                                    onChange={(e)=>setBookCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <MenuItem value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={categories}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} 
                                label="Book Category" 
                                focused 
                                color="secondary"
                                value={bookCategory}
                                onChange={(e)=>setBookCategory(e.target.value)} />
                                }
                            /> */}
                            <TextField 
                                label="Edition (optional)" 
                                color="secondary" 
                                focused 
                                sx={{width: 300}}
                                value={edition}
                                onChange={(e)=>setEdition(e.target.value)}
                            />
                        </Grid>
                        <Grid style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "30px"
                        }}>
                            <TextField 
                                label="Image" 
                                fullWidth 
                                color="secondary" 
                                focused 
                                size="large"
                                style={{
                                    width: "45%"
                                }}
                                value={image}
                                onChange={(e)=>setImage(e.target.value)} 
                            />
                            <TextField 
                                label="Book data in PDF" 
                                fullWidth 
                                color="secondary" 
                                focused 
                                size="large"
                                style={{
                                    width: "45%"
                                }}
                                value={bookData}
                                onChange={(e)=>setBookData(e.target.value)} 
                            />
                        </Grid>
                        <Button 
                            onClick={() => EditBook()} variant="contained" sx={{mt: 5, width: 200}} size="medium">Edit Book</Button>
                    </MainCard>
                </FormControl>
            </Grid>

        </Grid>
    );
};

export default DashboardDefault;
