                <section class='footer bg-black white'>
                    <div class='container'>
                        <div class='flex py-1 text-smaller'>

                            <div class='left'>

                                <a
                                    href='./'
                                    class='logo'
                                >
                                    <img
                                        src='assets/img/logo.png'
                                        alt='The Shoe Museum, Inc.'
                                        width='72'
                                        height='93'
                                    >
                                </a>

                                <ul>

                                    <li>
                                        <a
                                            href='<?= $privacy; ?>'
                                            class='hover-underline'
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href='<?= $terms; ?>'
                                            class='hover-underline'
                                        >
                                            Terms of Service
                                        </a>
                                    </li>

                                </ul>

                            </div>

                            <p class='right'>
                                © <?= date('Y'); ?> The Shoe Museum, Inc.
                            </p>

                        </div>

                    </div>
                </section>

            </div><!-- end .main-wrap -->
        </main>

        <footer>
            <script src='https://unpkg.com/lenis@1.3.4/dist/lenis.min.js'></script> 
            <script src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'></script>
            <script src='https://cdn.jsdelivr.net/npm/@fancyapps/ui@6.0/dist/fancybox/fancybox.umd.js'></script>
            <script src='https://unpkg.com/lucide@latest'></script>
            <script src='assets/js/functions.min.js' defer></script>
        </footer>

	</body>
</html>