const footerLinks = [
    {
      title: 'Youtube',
      href: '#',
    },
    {
      title: 'Twitter',
      href: '#',
    },
    {
      title: 'Instagram',
      href: '#',
    },
    {
      title: 'LinkedIn',
      href: '#',
    }
  ]
  
export const Footer = () => {
    return(
      <footer className="relative overflow-x-clip -z-10">
        <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-primary/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
        <div>
          <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
            <div className="text-white/40">&copy; 2024. Todos os direitos reservados.</div>
  
            <nav className="flex flex-col md:flex-row items-center gap-8">
              {footerLinks.map(item => (
                <a key={item.title} href={item.href} className="inline-flex items-center gap-1.5">
                  <span className="font-semibold">{item.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div> 
      </footer>
  
    ) 
  };