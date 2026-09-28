<script>
    export let name;
    export let profilePicture;
</script>

<div class="user-profile">
    <div class="avatar">
        <img src="{profilePicture ? `data:image/jpg;base64,${profilePicture}` : '/avatar.png'}" alt="Avatar" />
    </div>
    <h1 class="username">
        { name }
    </h1>
</div>

<style>
    h1 {
        font-size: 1.8rem;
        font-weight: 800;
        margin-top: 15px;
        margin-bottom: 5px;
        background: linear-gradient(135deg, #ffffff, #d0d5e2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.02em;
    }

    .username {
        text-align: center;
    }

    .user-profile {
        display: grid;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
    }

    .avatar {
        text-align: center;
        display: inline-block;
        margin: auto;
        padding: 4px;
        border-radius: 50%;
        background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
        box-shadow: 0 0 20px rgba(225, 48, 108, 0.4);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
    }

    .avatar:hover {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(225, 48, 108, 0.6);
    }

    .avatar img {
        display: block;
        border-radius: 50%;
        height: 128px;
        width: 128px;
        border: 4px solid #161922;
        object-fit: cover;
    }

    @media (max-width: 1200px) {
        h1 {
            font-size: 1.5rem;
        }
    }
    
    @media (max-width: 900px) {
        h1 {
            font-size: 1.3rem;
        }
    }

    @media screen and (max-width: 600px){
        .avatar img {
            height: 110px;
            width: 110px;
        }

        h1 {
            font-size: 1.5rem;
        }
    }
</style>

