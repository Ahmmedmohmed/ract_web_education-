import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import BlogsList from "./list/BlogsList";

function BlogsPage() {
    return (
        <>
            <BlogsList />
        </>
    );
}

export default BlogsPage;
