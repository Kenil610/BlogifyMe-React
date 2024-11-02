import React, { useCallback,useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData || {});
  const loading = !userData; // Loading state

  const [featuredImageUrl, setFeaturedImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (post) {
        const imageUrl = await appwriteService.getFilePreview(post.featuredImage);
        setFeaturedImageUrl(imageUrl);
      }
    };

    fetchImageUrl();
  }, [post]);



  const submit = async (data) => {
    if (loading) {
      console.error("User data is not available.");
      return;
    }

    const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

    if (post) {
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id, // Safe access
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, '-');
    }
    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  if (loading) {
    return <div>Loading user data...</div>; // Loading state or placeholder
  }

  return (
    <div className='post-form-outer-container'>
    <div className="post-form-container">
      <h2>{post ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="input-control">
          <Input
            label="Title:"
            placeholder="Enter title"
            {...register('title', { required: true })}
          />
        </div>
        <div className="input-control">
          <Input
            label="Slug"
            placeholder="Enter slug"
            {...register('slug', { required: true })}
            onInput={(e) => {
              setValue('slug', slugTransform(e.currentTarget.value, { shouldValidate: true }));
            }}
          />
        </div>
        <div className="rte-wrapper">
          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues('content')}
          />
        </div>
        <div className="input-control">
          <Input
            label="Featured Image:"
            type="file"
            accept="image/jpg, image/png, image/jpeg, image/gif"
            {...register('image', { required: !post })}
          />
          {post && (
            <div>
              <img
                className="featured-image-preview"
                src={featuredImageUrl}
                alt={post.title}
              />
            </div>
          )}
        </div>
        <div className="input-control">
          <Select
            label="Status:"
            options={['active', 'inactive']}
            {...register('status', { required: true })}
          />
        </div>
        <Button className="submit-btn" type="submit">
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </div>
    </div>
  );
}

export default PostForm;
