import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getBlogsByCategoryId } from '../../redux/actions/blogAction'

import { RootStore, IParams, IBlog } from '../../utils/TypeScript'

import Loading from '../../components/global/Loading'
import CardVert from '../../components/cards/CardVert'
import Pagination from '../../components/global/Pagination'


const BlogsByCategory = () => {
    const { categories, blogsCategory } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch<any>()
    const { slug } = useParams<IParams>()

    const navigate = useNavigate()
    let { search } = useLocation();

    const [categoryId, setCategoryId] = useState('')
    const [blogs, setBlogs] = useState<IBlog[]>()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const category = categories.find(item => item.name === slug)
        if (category) setCategoryId(category._id)
    }, [slug, categories])


    useEffect(() => {
        if (!categoryId) return;

        if (blogsCategory.every(item => item.id !== categoryId)) {
            dispatch(getBlogsByCategoryId(categoryId, search))
        } else {
            const data = blogsCategory.find(item => item.id === categoryId)
            if (!data) return;
            setBlogs(data.blogs)
            setTotal(data.total)

            if (data.search) navigate(data.search, { replace: true });
        }
    }, [categoryId, blogsCategory, dispatch, search, navigate])

    const handlePagination = (num: number) => {
        const search = `?page=${num}`
        dispatch(getBlogsByCategoryId(categoryId, search))
    }

    if (!blogs) return <Loading />;
    return (
        <div className="blogs_category">
            <div className="show_blogs">
                {
                    blogs.map(blog => (
                        <CardVert key={blog._id} blog={blog} />
                    ))
                }
            </div>

            {
                total > 1 &&
                <Pagination
                    total={total}
                    callback={handlePagination}
                />
            }
        </div>
    )
}

export default BlogsByCategory