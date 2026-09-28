<script>
    export let name;
    export let title;
</script>

<div class="card {name}">
    <h2>{title}</h2>
    <slot></slot>
</div>

<style>

    h2 {
        font-weight: 700;
        font-size: 1.35rem;
        background: linear-gradient(135deg, #fcb045, #fd1d1d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-top: 0;
        margin-bottom: 1.2rem;
        letter-spacing: -0.01em;
    }

    .card {
        background: rgba(22, 25, 34, 0.75);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .card:hover {
        transform: translateY(-2px);
        border-color: rgba(225, 48, 108, 0.3);
        box-shadow: 0 15px 35px -10px rgba(225, 48, 108, 0.15);
    }

    @media (min-width: 600px) {
        .card.first {
            grid-column: 4 / 8;
        }
        .card.second {
            grid-column: 8 / 12;
        }
        .card.ecology {
            grid-column: 1 / 6;
            grid-row: 4 / 5;
        }
        .card.security {
            grid-column: 1 / 3;
        }
        .card.top-users {
            grid-column: 1 / 6;
            grid-row: 2 / 4;
        }
        .card.top-channels {
            grid-column: 6 / 12;
        }
        .card.hours {
            grid-column: 6 / 12;
            grid-row: 2 / 3;
        }
        .card.months {
            grid-column: 6 / 12;
        }
        .card.profile {
            grid-column: 1 / 4;
        }
        .card.about {
            grid-column: 1 / 6;
        }
        .card.followers {
            grid-column: 6 / 12;
        }
    }
</style>
