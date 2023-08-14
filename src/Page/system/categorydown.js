const [scroll, setScroll] = useState(false);

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

const handleScroll = () => {
    if(window.scrollY >= 20){
      setScroll(true);
    }else{
      setScroll(false);
    }

  };