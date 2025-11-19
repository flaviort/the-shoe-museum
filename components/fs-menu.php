<section
    id='fs-menu'
    style='display: none'
    data-lenis-prevent
>
    <div class='wrapper'>

        <div class='top'>

            <p class='text-24 uppercase medium green'>
                Menu
            </p>

            <button class='close-fs'>
                <i data-lucide='x'></i>
            </button>

        </div>

        <div class='middle'>
            <ul class='menu text-80 uppercase'>

                <li>
                    <a href='<?= $exhibits; ?>'>
                        Exhibits
                    </a>
                </li>

                <li>
                    <a href='<?= $store; ?>'>
                        Store
                    </a>
                </li>

                <li>
                    <a href='<?= $about; ?>'>
                        About
                    </a>
                </li>

                <li>
                    <a href='<?= $contact; ?>'>
                        Contact
                    </a>
                </li>
            
                <li>
                    <button class='open-cart'>
                        Cart
                    </button>
                </li>

                <li>
                    <a href='/account'>
                        Login
                    </a>
                </li>

            </ul>
        </div>

    </div>
</section>

<div class='blur-everything'></div>